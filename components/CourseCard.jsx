import Button from "./global/button";
export default function CourseCard({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>  {/* Added text-black */}
      <p className="text-gray-800">{description}</p>                        {/* Darker description */}
      <div className="mt-4">
        <Button>View Course</Button>
      </div>
    </div>
  );
}
