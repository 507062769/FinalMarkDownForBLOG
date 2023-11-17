export default function PageList({ userId = 999 }: { userId?: number }) {
  return (
    <>
      <div className="my-4">
        <ul className="list-none p-0">
          {[0, 1, 2, 3, 4, 5, 6].map((item) => (
            <li key={item} className="my-2 h-96 bg-slate-500">
              item
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
