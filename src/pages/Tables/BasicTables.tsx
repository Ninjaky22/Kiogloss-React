import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { Link } from "react-router";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Ecomerce" />
      <div className="space-y-6">
        <ComponentCard title="Productos">
          <BasicTableOne />
          <Link to="/crear-productos" className="bg-green-600 text-white hover:bg-green-500 rounded-lg px-4 py-2 transition flex items-center gap-2">Crear Producto</Link>
        </ComponentCard>
      </div>
    </>
  );
}
