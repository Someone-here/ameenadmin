
function camelToTitle(text) {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function DataTable({ data, onPress }) {

  return (
    <div className="card w-full bg-slate-50 shadow-sm hover:shadow-lg transition-all" onClick={onPress}>
      <div className="card-body">
        <h2 className="card-title capitalize">{ data.role }</h2>
        <table className="table table-compact w-full">
          {Object.entries(data).map(([field, value]) => (
            <tr>
              <th>{camelToTitle(field)}</th>
              <td>{value}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
