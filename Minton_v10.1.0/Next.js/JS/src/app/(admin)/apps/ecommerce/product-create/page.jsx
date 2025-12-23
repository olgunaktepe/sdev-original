import PageBreadcrumb from "@/components/PageBreadcrumb";
import ProductCreateWizard from "@/app/(admin)/apps/ecommerce/product-create/ProductCreateWizard";
export const metadata = {
  title: "Create Product"
};
const ProductEdit = () => {
  return <>
      <PageBreadcrumb breadCrumbItems={[{
      label: "Ecommerce",
      path: "/apps/ecommerce/details"
    }, {
      label: "Add / Edit Product",
      path: "/apps/ecommerce/details",
      active: true
    }]} title={"Add / Edit Product"} />

      <div className="card">
        <div className="card-body">
          <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard form-wizard-header">
            <ProductCreateWizard />
          </div>
        </div>
      </div>
    </>;
};
export default ProductEdit;