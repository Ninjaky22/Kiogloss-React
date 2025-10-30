
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import MultiSelect from "../../components/form/MultiSelect";
import { FC, useEffect, useState } from "react";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { apiService, Categoria, Producto } from "../../utils/api";
import { useLocation } from "react-router";
const API_BASE_URL = "http://localhost:8081";

interface Option {
    value: string;
    text: string;
    selected:string
}
const CrearProducto = () => {
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const location = useLocation();
    const productoFromState = location.state?.producto as Producto | undefined;
    const [nombre, setNombre] = useState<string>("");
    const [descripción, setDescripcion] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");
    const [stock, setStock] = useState<string>("");
                  const navigatory = window.history;

    useEffect(()=>{
        console.log("Producto recibido en CrearProducto:", productoFromState);
        if(productoFromState){
            setNombre(productoFromState.nombres);
            setDescripcion(productoFromState.descripcion);
            setPrecio(productoFromState.precio.toString());
            setStock(productoFromState.stock.toString());
            const selectedCats = productoFromState.categorias.map(categoria => categoria.id.toString());
            console.log(selectedCats);
            
            setSelectedValues(selectedCats);
        }
        cargarCategoriasExistentes()
    },[productoFromState])

    const handleProducto = async () => {
        try {
            let categoriasPayload = Array.from(selectedValues)
            .map(id => ({ id: Number(id) }));

            const producto = {
                nombres: nombre,
                descripcion: descripción,
                precio: Number(precio),
                stock: Number(stock),
                categorias: categoriasPayload
            };
            if(productoFromState && productoFromState.id){
                // Actualizar producto existente
                await apiService.productos.update(productoFromState.id, producto);
                alert("Producto Actualizado");
                navigatory.back();
            } else {
                // Crear nuevo producto
                await apiService.productos.create(producto);
                alert("Producto Creado");
            }
            reset();
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const reset = () => {
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setStock("");
        setSelectedValues([])
    }

    const cargarCategoriasExistentes = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/categorias`);
            const categorias = await response.json();
            
            setOptions(categorias.map((categoria:Categoria)=> {
                return { value: `${categoria.id}`, text: categoria.nombre, selected: false }
            }))

        } catch (error) {
            console.error("Error al cargar categorías existentes:", error);
        }
    };
    return (
        <ComponentCard title={`${productoFromState ? 'Editar Producto' : 'Crear Producto'}`}>   
            <div className="space-y-6">
                <div>
                    <Label htmlFor="nombre">Nombre del Producto</Label>
                    <Input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <div>
                    <MultiSelect
                        label="Seleccionar Categorías"
                        options={options} 
                        
                        value={selectedValues}
                        onChange={(values) => setSelectedValues(values)}
                    />
                    <p className="sr-only">
                        Valores Seleccionados: {selectedValues.join(", ")}
                    </p>
                </div>
                <div>
                    <Label>Descripción</Label>
                    <TextArea
                        value={descripción}
                        placeholder="Ingresa el Mensaje"
                        onChange={(value) => setDescripcion(value)}
                        rows={6}
                    />
                </div>
                {/** Comentario */}
                <div>
                    <Label htmlFor="precio">Precio (COP)</Label>
                    <Input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
                </div>
                <div>
                    <Label htmlFor="stock">Stock Disponible</Label>
                    <Input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)}/>
                </div>
                <Button onClick={() => handleProducto()} className="w-full" size="sm">
                    {productoFromState ? 'Actualizar Producto' : 'Crear Producto'}
                </Button>
            </div>
        </ComponentCard>
    );
}
export default CrearProducto;