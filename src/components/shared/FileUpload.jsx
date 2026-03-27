import { useState } from 'react'
import { Upload, FileText, X, CheckCircle } from 'lucide-react'
import { cn } from '../../lib/cn'

export default function FileUpload({ accept, label = 'Carica file', onUpload, multiple = false }) {
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...dropped])
    onUpload?.(dropped)
  }

  const handleChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...selected])
    onUpload?.(selected)
  }

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center transition-colors',
          dragging ? 'border-primary-400 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
        )}
      >
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-xs text-gray-400 mb-4">Trascina i file qui oppure</p>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl cursor-pointer hover:bg-primary-600 transition-colors btn-press">
          <Upload className="h-4 w-4" />
          Sfoglia
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
              <FileText className="h-5 w-5 text-primary-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <CheckCircle className="h-4 w-4 text-success-500 flex-shrink-0" />
              <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-destructive-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
