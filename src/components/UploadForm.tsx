import { useState } from 'react';

interface CVAnalysis {
  skills?: string[];
  experience?: number;
  education?: string;
  summary?: string;
  [key: string]: unknown;
}
import axios from 'axios';

const uploadCvDirect = async (file: File, opts: { category?: string; setPrimary?: boolean }, token: string) => {
  const formData = new FormData();
  
  // Enviar solo el campo que espera multer: 'cv'
  formData.append('cv', file);
  
  if (opts.category) {
    formData.append('category', opts.category);
  }
  
  if (opts.setPrimary) {
    formData.append('setPrimary', 'true');
  }

  try {
    const res = await axios.post('https://hr-production-c212.up.railway.app/api/cvs/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 segundos timeout
    });
    return res.data as { cvId: number; analysis: CVAnalysis };
  } catch (error) {
    // Si falla, intentar con estructura simplificada
    console.log('Error en primer intento, intentando formato simplificado:', error);
    const simpleFormData = new FormData();
    simpleFormData.append('file', file);
    
    const res = await axios.post('https://hr-production-c212.up.railway.app/api/cvs/upload', simpleFormData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data as { cvId: number; analysis: CVAnalysis };
  }
};

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('it');
  const [makePrimary, setMakePrimary] = useState(true);

  const handleUpload = async () => {
    if (!file) {
      alert('Seleccioná un archivo PDF');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const res = await uploadCvDirect(file, { category, setPrimary: makePrimary }, token);
      setAnalysis(res.analysis);
      alert('✅ CV subido y analizado correctamente');
    } catch (err) {
      console.error('❌ Error al subir el CV:', err);
      alert('❌ Error al subir el CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-4 mx-auto border rounded shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Subir y analizar CV</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <div className="grid items-center grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block mb-1 text-sm font-medium">Categoría</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 bg-black/10 border rounded">
            <option value="it">IT</option>
            <option value="ventas">Ventas</option>
            <option value="atencion">Atención al público</option>
            <option value="contable">Contable</option>
            <option value="operario">Operario</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={makePrimary} onChange={e => setMakePrimary(e.target.checked)} />
            Marcar como principal en esta categoría
          </label>
        </div>
      </div>
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 text-white bg-blue-600 rounded disabled:opacity-50"
      >
        {loading ? 'Analizando...' : 'Subir CV'}
      </button>

      {analysis && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-medium">Resultado del análisis:</h3>
          <pre className="p-2 overflow-auto text-sm bg-gray-100 rounded">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
