"use client";
import React, { useState } from "react";
import DrawerDialogDemo from "@/components/forms/createProduct";
import Stripe from "stripe";

export default function ShowProducts({
  products,
}: {
  products: Stripe.Product[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Stripe.Product | null>(
    null,
  );
  console.log(products);
  const handleSellProduct = (product: Stripe.Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <p>
            <strong>Active:</strong> {product.active ? "Yes" : "No"}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(product.created * 1000).toLocaleDateString()}
          </p>
          <p>
            <strong>Deleted:</strong> {product.deleted ? "Yes" : "No"}
          </p>
          <p>
            <strong>Description:</strong> {product.description || "N/A"}
          </p>
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Images:</strong>{" "}
            {product.images.length > 0
              ? product.images.join(", ")
              : "No images"}
          </p>
          <p>
            <strong>Live Mode:</strong> {product.livemode ? "Yes" : "No"}
          </p>
          <p>
            <strong>Metadata:</strong>{" "}
            {Object.keys(product.metadata).length > 0
              ? JSON.stringify(product.metadata)
              : "No metadata"}
          </p>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Object:</strong> {product.object}
          </p>
          <p>
            <strong>URL:</strong> {product.url || "N/A"}
          </p>
          <p>
            <strong>Updated:</strong>{" "}
            {new Date(product.updated * 1000).toLocaleDateString()}
          </p>
          <p>
            <strong>Unit Label:</strong> {product.unit_label || "N/A"}
          </p>
          <button onClick={() => handleSellProduct(product)}>
            Sell this product
          </button>
        </div>
      ))}
      {selectedProduct && (
        <DrawerDialogDemo
          open={open}
          setOpen={setOpen}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
