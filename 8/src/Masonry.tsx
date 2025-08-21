export function Masonry({ items, columnCount = 4, gap = 16, renderItem }) {
  return (
    <div
      className="masonry"
      style={{
        columnCount,
        columnGap: gap,
      }}
    >
      {items.map((it) => (
        <div key={it.id} style={{ breakInside: "avoid", marginBottom: gap }}>
          {renderItem(it)}
        </div>
      ))}
    </div>
  );
}
