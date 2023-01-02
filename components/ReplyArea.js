export default function ReplyArea({ email, name }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex justify-between">
          <div>
            <h2 className="card-title">{name}</h2>
            <h3 className="text-lg font-medium bg-slate-50 p-2 mt-2 mb-2 rounded-md">{email}</h3>
          </div>
          <button className="btn btn-outline btn-success w-32 self-center">Send</button>
        </div>
        <textarea className="textarea textarea-bordered bg-slate-100 h-72" placeholder="Reply"></textarea>
      </div>
    </div>
  )
}