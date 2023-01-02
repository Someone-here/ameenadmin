import { Inter } from "@next/font/google";

function camelToTitle(text) {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const inter = Inter({ subsets: ['latin'] });

export default function DataTable({ data, onPress, expanded }) {

  return (
    <div className="card w-full bg-slate-50 shadow-sm hover:shadow-lg transition-all hover:scale-[102%]" onClick={onPress}>
      <div className="card-body">
        <h2 className="card-title capitalize">{ data.role }</h2>
        <table className="table table-compact w-full">
          {Object.entries(data).map(([field, value]) => (
            <tr>
              <th className={`${inter.className} text-lg `}>{camelToTitle(field)}</th>
              <td className={`${inter.className} text-lg`}>{value}</td>
            </tr>
          ))}
        </table>
        {expanded && (
          <div className="flex gap-8 mt-4">
            <button className="btn btn-outline btn-success w-1/3">Approve</button>
            <button className="btn btn-outline btn-error w-1/3">Disapprove</button>
          </div>
        )}
      </div>
    </div>
  );
}
