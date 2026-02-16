export interface RawAuditDataRow {
  eto_ofr_display_id: string;
  eto_ofr_approv_date_orig: string;
  fk_glcat_mcat_id: string;
  eto_ofr_glcat_mcat_name: string;
  quantity: string;
  quantity_unit: string;
  probable_order_value: string;
  bl_segment: string;
  bl_details: string;
}

export interface ThresholdDataRow {
  fk_glcat_mcat_id: string;
  glcat_mcat_name: string;
  leap_retail_qty_cutoff: string;
  gl_unit_name: string;
}

export function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n').filter(line => line.trim());
  return lines.map(line => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    return values;
  });
}

export function parseRawAuditData(csvText: string): RawAuditDataRow[] {
  const rows = parseCSV(csvText);
  if (rows.length === 0) return [];

  const headers = rows[0].map(h => h.toLowerCase().trim());
  const data: RawAuditDataRow[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < headers.length) continue;

    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });

    data.push({
      eto_ofr_display_id: obj.eto_ofr_display_id || '',
      eto_ofr_approv_date_orig: obj.eto_ofr_approv_date_orig || '',
      fk_glcat_mcat_id: obj.fk_glcat_mcat_id || '',
      eto_ofr_glcat_mcat_name: obj.eto_ofr_glcat_mcat_name || '',
      quantity: obj.quantity || '',
      quantity_unit: obj.quantity_unit || '',
      probable_order_value: obj.probable_order_value || '',
      bl_segment: obj.bl_segment || '',
      bl_details: obj.bl_details || '',
    });
  }

  return data;
}

export function parseThresholdData(csvText: string): ThresholdDataRow[] {
  const rows = parseCSV(csvText);
  if (rows.length === 0) return [];

  const headers = rows[0].map(h => h.toLowerCase().trim());
  const data: ThresholdDataRow[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < headers.length) continue;

    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });

    data.push({
      fk_glcat_mcat_id: obj.fk_glcat_mcat_id || '',
      glcat_mcat_name: obj.glcat_mcat_name || '',
      leap_retail_qty_cutoff: obj.leap_retail_qty_cutoff || '',
      gl_unit_name: obj.gl_unit_name || '',
    });
  }

  return data;
}

export function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header]?.toString() || '';
      return value.includes(',') ? `"${value}"` : value;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}

export function downloadCSV(data: any[], filename: string): void {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
