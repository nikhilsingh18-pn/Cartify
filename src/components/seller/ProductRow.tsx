import React from 'react';
import { Product } from '../../types';
import { Edit, Trash2 } from 'lucide-react';

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductRow: React.FC<Props> = ({ product, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img src={product.image} alt={product.name} className="w-12 h-12 object-contain rounded" />
          <div>
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        </div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm text-gray-600">₹{product.price.toLocaleString('en-IN')}</td>
      <td className="p-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          product.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {product.stock}
        </span>
      </td>
      <td className="p-4 whitespace-nowrap text-sm text-gray-600">{product.rating} ({product.reviews})</td>
      <td className="p-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex gap-4 justify-end">
          <button onClick={() => onEdit(product)} className="text-primary hover:text-primary-700">
            <Edit size={18} />
          </button>
          <button onClick={() => onDelete(product.id)} className="text-accent hover:text-red-700">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
