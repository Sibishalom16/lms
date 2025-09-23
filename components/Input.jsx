export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        {...props}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
