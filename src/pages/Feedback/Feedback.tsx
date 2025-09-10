import Tile from "../../ui/Title"
import Input from "../../ui/Input"
import useFeedback from "./useFeedback"
const Feedback = () => {
    const {handleSubmit, setForm, form} = useFeedback()
    return (
    <div className="h-full flex flex-col items-center">
        <Tile title="Make a Suggestion ✨" />

        <form
            onSubmit={handleSubmit} 
            className="flex flex-col p-4 w-fit my-auto">
            <Input
                label="Subject"
                placeholder="ex. problem generating quiz"
                value={form.subject}
                onChange={e => setForm(prev => ({...prev, subject: e.target.value}))}
            />

            <>
                <div className="mr-auto py-1 text-sm select-none">Message</div>
                <textarea 
                value={form.message}
                onChange={e => setForm(prev => ({...prev, message: e.target.value}))}
                className="border border-gray-300 px-4 py-2 rounded-xl bg-gray-50 text-gray-700
           shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]
           focus:outline-none focus:shadow-[2px_2px_4px_rgba(255,255,255,0.8),-1px_-1px_2px_rgba(0,0,0,0.05)] min-h-30 max-h-60"/>
            </>



            <button className="w-fit px-3 py-2 ml-auto my-4 text-white bg-[#f24c7c] hover:opacity-45  cursor-pointer rounded-lg shadow">
                Submit
            </button>
        </form>
    </div>
  )
}

export default Feedback