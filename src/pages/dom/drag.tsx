export default () => {
  const onDragStart = (e: React.DragEvent<HTMLElement>, tag: string) => {
    e.dataTransfer.setData('tag', tag);
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLElement>, item: string) => {
    e.preventDefault();
    console.log(e.target);
    const target = e.target as HTMLElement;
    const tag = e.dataTransfer.getData('tag');
    target.innerHTML = tag;
    console.log(`Dropped ${tag} onto ${item}`);
    // do something with dropped data here
  };

  return <div>
    <ul>
      <li onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'Coffee')}>Coffee</li>
      <li onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'Tea')}>
        Tea
        <ul>
          <li onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'Black tea')}>Black tea</li>
          <li onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'Green tea')}>Green tea</li>
        </ul>
      </li>
      <li onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'Milk')}>Milk</li>
    </ul>

    <div className="border border-solid space-x-2">
      <span>Drag me:</span>
      <span draggable="true" onDragStart={(e) => onDragStart(e, 'tag1')}>tag1</span>
      <span draggable="true" onDragStart={(e) => onDragStart(e, 'tag2')}>tag2</span>
    </div>
  </div>;
};