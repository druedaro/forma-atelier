import React from 'react';

export function SizeGuide() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <p className="font-body text-sm text-stone leading-relaxed">
          Utiliza la siguiente tabla para encontrar la talla que mejor se adapte a ti. Nuestras medidas están diseñadas para una silueta elegante y cómoda.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-body text-sm border-collapse">
          <thead>
            <tr className="border-b border-noir text-xs uppercase tracking-widest">
              <th className="py-4 font-medium text-noir">Talla</th>
              <th className="py-4 font-medium text-noir">Pecho</th>
              <th className="py-4 font-medium text-noir">Cintura</th>
              <th className="py-4 font-medium text-noir">Cadera</th>
            </tr>
          </thead>
          <tbody className="text-stone">
            <tr className="border-b border-linen hover:bg-smoke/30 transition-colors">
              <td className="py-4 font-medium text-noir">XS (34)</td>
              <td className="py-4">82 cm</td>
              <td className="py-4">62 cm</td>
              <td className="py-4">90 cm</td>
            </tr>
            <tr className="border-b border-linen hover:bg-smoke/30 transition-colors">
              <td className="py-4 font-medium text-noir">S (36)</td>
              <td className="py-4">86 cm</td>
              <td className="py-4">66 cm</td>
              <td className="py-4">94 cm</td>
            </tr>
            <tr className="border-b border-linen hover:bg-smoke/30 transition-colors">
              <td className="py-4 font-medium text-noir">M (38)</td>
              <td className="py-4">90 cm</td>
              <td className="py-4">70 cm</td>
              <td className="py-4">98 cm</td>
            </tr>
            <tr className="border-b border-linen hover:bg-smoke/30 transition-colors">
              <td className="py-4 font-medium text-noir">L (40)</td>
              <td className="py-4">96 cm</td>
              <td className="py-4">76 cm</td>
              <td className="py-4">104 cm</td>
            </tr>
            <tr className="border-b border-linen hover:bg-smoke/30 transition-colors">
              <td className="py-4 font-medium text-noir">XL (42)</td>
              <td className="py-4">102 cm</td>
              <td className="py-4">82 cm</td>
              <td className="py-4">110 cm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-6 p-6 bg-smoke/50 mt-4">
        <h3 className="font-display text-lg uppercase tracking-widest text-noir">Cómo medirte</h3>

        <div className="flex flex-col gap-4 font-body text-sm text-stone">
          <div>
            <strong className="text-noir font-medium block mb-1">Pecho</strong>
            <p>Mide el contorno de la parte más prominente del pecho, manteniendo la cinta métrica horizontal.</p>
          </div>
          <div>
            <strong className="text-noir font-medium block mb-1">Cintura</strong>
            <p>Mide alrededor de la parte más estrecha de tu cintura natural.</p>
          </div>
          <div>
            <strong className="text-noir font-medium block mb-1">Cadera</strong>
            <p>De pie con los pies juntos, mide alrededor de la parte más ancha de la cadera.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
