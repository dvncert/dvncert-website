"use client";

/**
 * Onaylı sil butonu. Bir server action'ı (sil) prop olarak alır ve gizli id ile
 * gönderir; kullanıcı onaylamazsa gönderim iptal edilir.
 */
export default function SilButonu({
  id,
  action,
  etiket = "Sil",
}: {
  id: number;
  action: (formData: FormData) => Promise<void>;
  etiket?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
          e.preventDefault();
        }
      }}
      style={{ display: "inline" }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 13, fontWeight: 500, padding: 0 }}
      >
        {etiket}
      </button>
    </form>
  );
}
