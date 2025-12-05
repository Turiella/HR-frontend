import { Candidate, SearchParams } from '../types';

// Enhanced CSV export with more data
export const exportEnhancedCSV = (candidates: Candidate[], searchParams: SearchParams) => {
  const headers = [
    'Ranking',
    'Nombre Completo',
    'Email',
    'Score',
    'Experiencia (años)',
    'Skills',
    'Required Matches',
    'Preferred Matches',
    'Job Description Matches',
    'Experiencia OK',
    'Ciudad',
    'Género',
    'Educación',
    'Distancia (km)',
    'CV ID',
    'User ID'
  ];

  const rows = candidates.map((candidate: Candidate, index: number) => [
    index + 1,
    candidate.fullName || '',
    candidate.email || '',
    candidate.score || 0,
    candidate.experienceYears || 0,
    (candidate.skills || []).join('; '),
    candidate.reasons?.requiredMatches || 0,
    candidate.reasons?.preferredMatches || 0,
    candidate.reasons?.jobDescriptionMatches || 0,
    candidate.reasons?.experienceOK ? 'Sí' : 'No',
    candidate.city || '',
    candidate.gender || '',
    (candidate.education || []).join('; '),
    candidate.reasons?.distanceKm || '',
    candidate.cvId || '',
    candidate.userId || ''
  ]);

  const metadata = [
    ['Búsqueda HR Selector', ''],
    ['Skills Requeridas', searchParams.requiredSkills || ''],
    ['Skills Preferidas', searchParams.preferredSkills || ''],
    ['Experiencia Mínima', `${searchParams.minExperience || 0} años`],
    ['Género', searchParams.gender || 'Todos'],
    ['Ciudades', searchParams.cities || 'Todas'],
    ['Distancia Máxima', `${searchParams.maxDistanceKm || 'N/A'} km`],
    ['Descripción del Puesto', searchParams.jobDescription || ''],
    ['Fecha de Exportación', new Date().toLocaleString('es-AR')],
    ['Total Candidatos', candidates.length],
    ['', ''],
    ...headers
  ];

  const csvContent = [
    ...metadata,
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`))
  ].map(row => Array.isArray(row) ? row.join(',') : String(row)).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hr-ranking-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// PDF export using jsPDF (would need to install jsPDF)
export const exportPDF = () => {
  // This is a placeholder for PDF export
  // In a real implementation, you would use a library like jsPDF
  alert('Exportación PDF coming soon! Por ahora usa CSV.');
};

// Share functionality
export const shareResults = (candidates: Candidate[], searchParams: SearchParams) => {
  const shareData = {
    title: 'Resultados de Búsqueda - HR Selector',
    text: `Encontré ${candidates.length} candidatos con los siguientes filtros:\n` +
          `• Required: ${searchParams.requiredSkills || 'N/A'}\n` +
          `• Preferred: ${searchParams.preferredSkills || 'N/A'}\n` +
          `• Experiencia: ${searchParams.minExperience || '0'}+ años\n` +
          `• Score promedio: ${(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length).toFixed(2)}`,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareData.text + '\n' + shareData.url);
    alert('Resultados copiados al portapapeles');
  }
};
