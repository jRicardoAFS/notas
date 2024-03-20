import { ChangeEvent, useState } from 'react'
import Logo from './assets/Logo.svg'
import { NewNoteCart } from './components/New-note-cart'
import { NoteCart } from './components/Note-carts'

interface Note {
  id: string,
  date: Date,
  content: string,
}

export const App = () => {

  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  });
  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  };
  function onNoteDeleted(id: string){
    const notesArray = notes.filter(note =>{
      return note.id !== id
    })
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  };

  const filteredNotes = search !== ''
    ? notes.filter(note=> note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5 '>
      <img src={Logo} alt="logo" />

      <form className='w-full'>
        <input
          type="text"
          onChange={handleSearch}
          placeholder='Busque suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight 
        placeholder: outline-none text-slate-500'
        />



      </form>
      <div className='h-px bg-slate-700' />





      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">


        <NewNoteCart onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => {
          return <NoteCart 
          key={note.id} 
          note={note} 
          onNoteDeleted={onNoteDeleted}
          />
        })}

      </div>

    </div>
  )
}

