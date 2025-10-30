import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { useEffect, useState } from "react";
import { apiService, Producto } from "../../../utils/api";
import { useNavigate, useSearchParams } from "react-router";

export default function BasicTableOne() {
  const [tableData, setTableData] = useState<Producto[]>([]);
  const [filteredData, setFilteredData] = useState<Producto[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrar cuando cambian los parámetros de búsqueda
  useEffect(() => {
    const searchTerm = searchParams.get('search');
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = tableData.filter((producto) =>
        producto.nombres.toLowerCase().includes(searchLower) ||
        producto.descripcion.toLowerCase().includes(searchLower) ||
        producto.categorias.some((cat) => 
          (cat.nombre?.toLowerCase().includes(searchLower) ?? false)
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(tableData);
    }
  }, [searchParams, tableData]);

  const handleDeleteProducto = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      try {
        await apiService.productos.delete(id);
        await fetchData();
        alert('Producto eliminado exitosamente');
      } catch (err) {
        alert('Error al eliminar el producto');
        console.error(err);
      }
    }
  };

  const handleEditProducto = (producto: Producto) => {
    console.log("Editar producto:", producto);
    navigate("/crear-productos", { state: { producto } });
  };

  const fetchData = async () => {
    try {
      const data = await apiService.productos.getAll();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {searchParams.get('search') && (
          <div className="px-5 py-3 border-b border-gray-100 dark:border-white/[0.05]">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {filteredData.length} resultado(s) para: 
              <span className="font-medium text-gray-900 dark:text-white ml-1">
                "{searchParams.get('search')}"
              </span>
              <button
                onClick={() => navigate('/productos')}
                className="ml-2 text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                Limpiar búsqueda
              </button>
            </p>
          </div>
        )}
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nombre
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Descripción
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Precio
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Stock
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Estado
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Categoría
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Creación
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actualización
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ver Información
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell className="px-5 py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchParams.get('search') 
                      ? 'No se encontraron productos con ese criterio de búsqueda'
                      : 'No hay productos para mostrar'
                    }
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {producto.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {producto.nombres}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {producto.descripcion}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {producto.precio}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {producto.stock}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        producto.stock > 10
                          ? "success"
                          : producto.stock > 0
                            ? "warning"
                            : "error"
                      }
                    >
                      {producto.stock > 10
                        ? "En Stock"
                        : producto.stock > 0
                          ? "Bajo Stock"
                          : "Sin Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {producto.categorias
                      .map((categoria) => categoria.nombre)
                      .join(", ")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {producto.fechaCreacion}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {producto.fechaActualizacion}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (producto.id) handleEditProducto(producto);
                        }}
                        className="bg-green-600 text-white hover:bg-green-500 rounded-lg px-4 py-2 transition flex items-center gap-2"
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-600 text-white hover:bg-red-500 rounded-lg px-4 py-2 transition flex items-center gap-2"
                        onClick={() => {
                          if (producto.id) handleDeleteProducto(producto.id);
                        }}
                        disabled={producto.id ? false : true}
                      >
                        Eliminar
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}