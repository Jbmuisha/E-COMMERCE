import Link from "next/link";
import { notFound } from "next/navigation";
import connection from "@/app/lib/mongodb";
import Product from "@/app/admin/models/product";
import "../product-detail.css";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return notFound();

  await connection();

  const doc = await Product.findById(id).lean();
  if (!doc) return notFound();

  const name = (doc as any).name || "";
  const image = (doc as any).image || "";
  const price = Number((doc as any).price || 0);
  const description = (doc as any).description || "";

  return (
    <div className="pd-container">
      <nav className="pd-breadcrumb">
        <Link href="/shop/product">← Back to products</Link>
      </nav>

      <div className="pd-grid">
        <div className="pd-media">

          <img src={image} alt={name} className="pd-image" />
        </div>
        <div className="pd-info">
          <h1 className="pd-title">{name}</h1>
          <div className="pd-price">{price.toFixed(2)}€</div>
          <p className="pd-desc">{description || "No description available."}</p>

          <div className="pd-qty-row">
            <label htmlFor="qty">Quantity</label>
            <input id="qty" name="qty" type="number" min={1} defaultValue={1} className="pd-qty" />
          </div>

          <div className="pd-pay-grid">
            <button className="btn btn-stripe" type="button">Pay with Card (Stripe)</button>
            <button className="btn btn-orange" type="button">Pay with Orange Money</button>
            <button className="btn btn-airtel" type="button">Pay with Airtel Money</button>
          </div>

          <div className="pd-note">Payments will redirect to secure checkout pages. You will return here after completion.</div>
        </div>
      </div>
    </div>
  );
}
