import { gmodal2 } from './context/gmodal2';
import resso from './context/resso';

export const gstate = resso({
  username: "n/a",
  loaded: false,
});

{/* pages/show-user.tsx 组件A：订阅状态 */ }
export function ShowUser() {
  const username = gstate.username.useSnapshot();
  return <div>Your username is:{username}</div>;
}

{/* pages/change-user.tsx 组件B: 修改状态 */ }
export function ChangeUser() {
  const changeUser = (name: string) => {
    gstate.username.setSnapshot(name);
  };
  return <div>
    <input
      placeholder="input your name"
      onChange={(e) => changeUser(e?.target?.value)}
    />
  </div>;
}

export default function App() {
  const changeUser = () => {
    gmodal2(<div className="border border-solid p-8">
      <h3> Component B: ChangeUser </h3>
      <ChangeUser />
    </div>);
  };
  return <div>
    <h3><button onClick={changeUser}>send data</button></h3>
    <div className="border border-solid p-8">
      <h3>Component A: ShowUser (receive data)</h3>
      <ShowUser />
    </div>
  </div>;
}
