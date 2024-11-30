import { readLines } from "https://deno.land/std/io/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import { debounce } from "https://deno.land/std/async/mod.ts";

async function readFirstLine(path: string) {
  const file = await Deno.open(path);
  try {
    for await (const line of readLines(file)) return line;
    return ''; // If the file is empty.
  } finally {
    file.close(); // Close file stream.
  }
}

async function getPageTitle(path: string) {
  const content = await readFirstLine(path);
  const title = content.match(/^\/\/\s*title:\s*(\S.+)/)?.[1];
  return title || path.replace('.tsx', '').split('/').pop() as string;
}

interface MenuItem {
  key: string;
  label: string;
  is_file?: boolean;
  children?: MenuItem[];
}

export const generatePagePath = debounce(async () => {
  const root = "./src/pages";
  const pagePathTitleList: { path: string, title: string; }[] = [];

  async function genMenuItemFromRoot(dir: string, menuItems: MenuItem[] = []) {
    for await (const dirEntry of Deno.readDir(dir)) {
      const absolutePath = join(dir, dirEntry.name);
      if (dirEntry.isDirectory) {
        const menuItem: MenuItem = {
          key: dirEntry.name,
          label: dirEntry.name,
          children: [],
        };
        menuItems.push(menuItem);
        await genMenuItemFromRoot(absolutePath, menuItem.children!);
        if (!menuItem.children?.length) {
          menuItems.pop();
        }
      } else {
        if (absolutePath.match(/\.tsx$/)) {
          const title = await getPageTitle(absolutePath);
          const shortPagePath = absolutePath.replace('src/', '').replace('.tsx', '');
          menuItems.push({ key: dirEntry.name, label: title });
        }
      }
    }
    return menuItems;
  }

  const menuItems = await genMenuItemFromRoot(root, []);
  const menuItemsjs = JSON.stringify(menuItems, null, 2);
  const pagePathsContent = `import { PageRoute } from './page-routes.d';
export const pagePaths: PageRoute[] = ${menuItemsjs} as const; `;
  await Deno.writeTextFile('./src/conf/page-routes.ts', pagePathsContent);
  return pagePathTitleList;
}, 500);