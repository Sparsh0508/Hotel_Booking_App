import React, { useState, useMemo } from 'react'
import { roomsDummyData, assets, facilityIcons } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

const AllRooms = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    beds: [],
    prices: [],
    sort: '',
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const priceRanges = ['0 to 100', '100 to 200', '200 to 300', '300 to 400', '400 to 500']
  const bedTypes = ['Single Bed', 'Family Suite', 'Double Bed', 'Luxury Room']
  const sortOptions = ['Price Low to High', 'Price High to Low', 'Newest First']

  const handleCheckbox = (category, value) => {
    setFilters(prev => {
      const updated = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
      return { ...prev, [category]: updated }
    })
  }

  const handleSortChange = (value) => {
    setFilters(prev => ({
      ...prev,
      sort: prev.sort === value ? '' : value
    }))
  }

  const clearAll = () => {
    setFilters({ beds: [], prices: [], sort: '' })
  }

  const filteredRooms = useMemo(() => {
    let filtered = [...roomsDummyData]

    if (filters.beds.length > 0) {
      filtered = filtered.filter(room =>
        filters.beds.includes(room.roomType)
      )
    }

    if (filters.prices.length > 0) {
      filtered = filtered.filter(room => {
        return filters.prices.some(range => {
          const [min, max] = range
            .replace(/\$/g, '')
            .split('to')
            .map(str => Number(str.trim()))
          return room.pricePerNight >= min && room.pricePerNight <= max
        })
      })
    }

    if (filters.sort === 'Price Low to High') {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight)
    } else if (filters.sort === 'Price High to Low') {
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight)
    } else if (filters.sort === 'Newest First') {
      filtered.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    return filtered
  }, [filters])

  // Shared Filter Content
  const FiltersPanel = ({ onClose }) => (
    <div className="border p-4 w-full max-w-xs bg-white h-full shadow-lg overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="font-semibold text-sm">FILTERS</h2>
        <button
          onClick={() => {
            clearAll()
            onClose && onClose()
          }}
          className="text-xs text-gray-500 hover:underline"
        >
          CLEAR
        </button>
      </div>

      {/* Bed Filters */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-2">Popular filters</h3>
        {bedTypes.map(bed => (
          <label key={bed} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <input
              type="checkbox"
              checked={filters.beds.includes(bed)}
              onChange={() => handleCheckbox('beds', bed)}
              className="form-checkbox accent-black"
            />
            {bed}
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-2">Price</h3>
        {priceRanges.map(price => (
          <label key={price} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <input
              type="checkbox"
              checked={filters.prices.includes(price)}
              onChange={() => handleCheckbox('prices', price)}
              className="form-checkbox accent-black"
            />
            ${price}
          </label>
        ))}
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="font-semibold text-sm mb-2">Sort By</h3>
        {sortOptions.map(option => (
          <label key={option} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <input
              type="checkbox"
              checked={filters.sort === option}
              onChange={() => handleSortChange(option)}
              className="form-checkbox accent-black"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <div className='flex flex-col lg:flex-row items-start justify-between pt-28 md:pt-32 px-4 md:px-10 lg:px-20 gap-6'>

      {/* Filter Toggle Button (Mobile Only) */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className='lg:hidden mb-4 px-4 py-2 border rounded text-sm font-medium text-gray-700'
      >
        Show Filters
      </button>

      {/* Sidebar (Large screens) */}
      <div className='hidden lg:block w-1/4'>
        <FiltersPanel />
      </div>

      {/* Room Listings */}
      <div className='w-full lg:w-3/4'>
        <div className='flex flex-col items-start text-left mb-6'>
          <h1 className='font-playfair text-3xl sm:text-4xl'>Hotel Rooms</h1>
          <p className='text-sm sm:text-base text-gray-500/90 mt-2 max-w-2xl'>
            Take advantage of our limited-time offers and special packages to enhance your stay and create <br /> unforgettable memories.
          </p>
        </div>

        {filteredRooms.length > 0 ? filteredRooms.map((room) => (
          <div key={room._id} className="flex flex-col md:flex-row gap-4 mb-8">
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`)
                window.scrollTo(0, 0)
              }}
              src={room.images[0]}
              alt="hotel-img"
              title="View Room Details"
              className="w-full md:w-1/2 max-h-64 rounded-xl shadow-lg object-cover cursor-pointer"
            />

            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.address}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`)
                  window.scrollTo(0, 0)
                }}
                className="text-gray-800 text-2xl sm:text-3xl font-playfair cursor-pointer"
              >
                {room.hotel.name}
              </p>

              <div className="flex items-center">
                <StarRating rating={room.hotel.rating || 0} />
                <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
              </div>

              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
                <span>{room.hotel.address}</span>
              </div>

              <div className='flex flex-wrap items-center mt-3 mb-3 gap-3'>
                {room.amenities.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                    <img src={facilityIcons[item]} alt={item} className='w-4 h-4' />
                    <p className='text-xs'>{item}</p>
                  </div>
                ))}
              </div>

              <p className='text-lg font-semibold text-gray-700'>${room.pricePerNight}/night</p>
            </div>
          </div>
        )) : (
          <p className='text-gray-600 text-sm'>No rooms match your filters.</p>
        )}
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="relative w-3/4 max-w-xs h-full bg-white">
            <button
              onClick={() => setShowMobileFilters(false)}
              className="absolute top-2 right-3 text-gray-500 text-lg"
            >
              ✕
            </button>
            <FiltersPanel onClose={() => setShowMobileFilters(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AllRooms
