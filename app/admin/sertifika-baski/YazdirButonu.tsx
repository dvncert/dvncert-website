"use client";

export default function YazdirButonu() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        background: "linear-gradient(135deg, #F58220, #e06d0c)",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: 8,
        fontWeight: 500,
        fontSize: 13.5,
        cursor: "pointer",
      }}
    >
      Yazdır / PDF olarak kaydet
    </button>
  );
}
