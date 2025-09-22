export default function CourseCard({ title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-full text-sm hover:bg-purple-600">
        View Course
      </button>
    </div>
  );
}