import React from 'react';
import { Link } from 'react-router-dom';

// Updated images to ensure they load correctly and match the theme
const categories = [
  { 
    name: 'Groceries', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80', 
    link: '/products?category=Groceries',
    color: 'border-ocean-cyan'
  },
  { 
    name: 'Mobiles', 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80', 
    link: '/products?category=Electronics',
    color: 'border-ocean-teal'
  },
  { 
    name: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=200&q=80', 
    link: '/products?category=Fashion',
    color: 'border-ocean-dark'
  },
  { 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=200&q=80', // Updated Electronics Image
    link: '/products?category=Electronics',
    color: 'border-ocean-cyan'
  },
  { 
    name: 'Home', 
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=200&q=80', 
    link: '/products?category=Home+%26+Garden',
    color: 'border-ocean-teal'
  },
  { 
    name: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=200&q=80', 
    link: '/products?category=Home+%26+Garden',
    color: 'border-ocean-dark'
  },
  { 
    name: 'Sports', 
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=200&q=80', 
    link: '/products?category=Sports+%26+Outdoors',
    color: 'border-ocean-cyan'
  },
  { 
    name: 'Beauty', 
    image: 'https://images.unsplash.com/photo-1571781535009-20cb28e56ca7?auto=format&fit=crop&w=200&q=80', // Updated Beauty Image
    link: '/products?category=Beauty+%26+Personal+Care',
    color: 'border-ocean-teal'
  },
  {
    name: 'Toys',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=200&q=80', // Updated Toys Image
    link: '/products?category=Toys+%26+Games',
    color: 'border-ocean-dark'
  }
];

const CategoryNav: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-6 flex justify-between items-start text-center overflow-x-auto gap-6 md:gap-8 no-scrollbar">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className="flex-shrink-0 w-20 md:w-24 group flex flex-col items-center"
          >
            <div className={`w-14 h-14 md:w-18 md:h-18 rounded-full overflow-hidden mb-2 border-2 ${category.color} p-0.5 transition-all shadow-sm bg-white group-hover:scale-110 group-hover:border-accent`}>
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <p className="text-xs md:text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
