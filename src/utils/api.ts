const API_BASE_URL = "http://localhost:8081";
const apiService = {
  productos: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/productos`);
      if (!response.ok) throw new Error('Error al obtener productos');
      return response.json();
    },
    getById: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/productos/buscar-proyecto/${id}`);
      if (!response.ok) throw new Error('Error al obtener proyecto');
      return response.json();
    },
    create: async (producto: Producto) => {
      const response = await fetch(`${API_BASE_URL}/productos/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      if (!response.ok) throw new Error('Error al crear proyecto');
      return response;
    },
    update: async (id: number, producto: Producto) => {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...producto, id})
      });
      if (!response.ok) throw new Error('Error al actualizar proyecto');
      return response.json();
    },
    delete: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar proyecto');
      return response;
    }
  },
  categorias: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/estudiantes`);
      if (!response.ok) throw new Error('Error al obtener estudiantes');
      return response.json();
    }
  }
};

interface Categoria {
  id: number;
  nombre?: string;
}

interface Producto {
  id?: number;
  nombres: string;
  descripcion: string;
  precio: number;
  stock: number;
  fechaCreacion?: string;
  fechaActualizacion?: string;
  categorias: Categoria[];
}

export {
    apiService
};
export type {
    Producto,
    Categoria
};
