export default function AdminDashboard() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Orders" value="124" />
          <Card title="Products" value="58" />
          <Card title="Users" value="1,204" />
        </div>
      </div>
    );
  }
  
  function Card({ title, value }: { title: string; value: string }) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    );
  }
  