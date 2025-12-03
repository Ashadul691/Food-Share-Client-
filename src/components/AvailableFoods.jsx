import { useState, useMemo } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AvailableFoods = () => {
  const originalFoods = useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const filteredFoods = useMemo(() => {
    const filtered = originalFoods.filter(
      (food) =>
        (food.foodStatus === 'Available' || food.foodStatus === 'available') &&
        food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.expiredDateTime);
      const dateB = new Date(b.expiredDateTime);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [originalFoods, searchQuery, sortOrder]);

  const visibleFoods = filteredFoods.slice(0, visibleCount);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(6);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleShowLess = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 6, 6));
  };

  const toggleLayout = () => {
    setIsThreeColumn((prevState) => !prevState);
  };

  return (
    <div className="w-10/12 mx-auto mb-40 mt-20">
      <h1 className="text-center text-4xl font-bold mt-20 pb-10">
        Available Foods
      </h1>

      {/* Search, Sort, and Layout Toggle Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by food name..."
          className="input input-bordered w-1/3"
        />

        <div className="flex gap-4">
          <button
            onClick={handleSort}
            className="btn hover:bg-[#89b758] hover:text-white text-[#89b758] border-[#89b758] px-6 py-2 rounded-md bg-transparent transition duration-200"
          >
            Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
          <button
            onClick={toggleLayout}
            className="btn hover:bg-[#89b758] hover:text-white text-[#89b758] border-[#89b758] px-6 py-2 rounded-md bg-transparent transition duration-200"
          >
            {isThreeColumn
              ? 'Switch to 2-Column Layout'
              : 'Switch to 3-Column Layout'}
          </button>
        </div>
      </div>

      {/* Food Items Grid */}
      <div
        className={`grid gap-10 ${
          isThreeColumn
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {visibleFoods.map((food) => (
          <div key={food._id} className="">
            <div className="card card-compact bg-base-100 h-full border">
              <figure>
                <img
                  className="h-[250px] object-cover"
                  src={food.foodImage}
                  alt={food.foodName}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{food.foodName}</h2>
                <p>{food.additionalNotes}</p>
                <h3 className="text-base">
                  <span className="font-bold">Availability:</span>{' '}
                  {food.foodStatus}
                </h3>
                <h3 className="text-base">
                  <span className="font-bold">Quantity:</span>{' '}
                  {food.foodQuantity}
                </h3>
                <h3 className="text-base">
                  <span className="font-bold">Expired Date:</span>{' '}
                  {new Date(food.expiredDateTime).toLocaleDateString()}
                </h3>
                <Link
                  to={`/FoodDetails/${food._id}`}
                  className="btn bg-[#89b758] text-white border-0 text-lg px-10 hover:text-black"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More and Show Less Buttons */}
      <div className="flex justify-center items-center mt-10">
        {visibleCount < filteredFoods.length && (
          <button
            onClick={handleShowMore}
            className="btn bg-transparent border-[#89b758] text-[#89b758] text-xl px-10 py-2 mr-4 hover:bg-[#89b758] hover:text-white"
          >
            Show More
          </button>
        )}
        {visibleCount > 6 && (
          <button
            onClick={handleShowLess}
            className="btn bg-transparent border-[#89b758] text-[#89b758] text-xl px-10 py-2 hover:bg-[#89b758] hover:text-white"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;