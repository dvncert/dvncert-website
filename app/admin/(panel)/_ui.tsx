import type { CSSProperties, ReactNode } from "react";

export const adminInput: CSSProperties = {
  width: "100%",
  fontFamily: "inherit",
  fontSize: 14,
  color: "var(--dvn-lacivert)",
  background: "white",
  border: "1px solid var(--dvn-gri-300)",
  borderRadius: 8,
  padding: "9px 12px",
  outline: "none",
};

export const adminLabel: CSSProperties = {
  fontSize: 12.5,
  fontWeight: 600,
  color: "var(--dvn-gri-700)",
  display: "block",
  marginBottom: 5,
};

export const adminKart: CSSProperties = {
  background: "white",
  border: "0.5px solid var(--dvn-gri-300)",
  borderRadius: 12,
  padding: "20px 22px",
};

export const btnBirincil: CSSProperties = {
  background: "var(--dvn-gradient-turuncu)",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 13.5,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

export const btnIkincil: CSSProperties = {
  background: "white",
  color: "var(--dvn-lacivert)",
  border: "0.5px solid var(--dvn-gri-300)",
  padding: "8px 16px",
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 13,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

export const adminTablo: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13.5,
  background: "white",
};

export function Alan({ etiket, children }: { etiket: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={adminLabel}>{etiket}</label>
      {children}
    </div>
  );
}

export function SayfaBaslik({ baslik, sag }: { baslik: string; sag?: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
      <h1 style={{ color: "var(--dvn-lacivert)", fontSize: 22, fontWeight: 600, margin: 0 }}>{baslik}</h1>
      {sag}
    </div>
  );
}
