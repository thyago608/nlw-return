import { useState, useRef, FormEvent } from "react";
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

type FeedbackContentStepProps = {
    feedbackType:FeedbackType;
    onFeedbackRestartRequested: () => void;
};

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested }:FeedbackContentStepProps){
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshoot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');


    function handleSubmitFeedback(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
    }

    return(
        <>
            <header>
                <button 
                    type="button"
                    onClick={onFeedbackRestartRequested} 
                    className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img 
                        src={feedbackTypeInfo.image.source} 
                        alt={feedbackTypeInfo.image.alt} 
                        className="w-6 h-6"
                    />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form 
                onSubmit={handleSubmitFeedback}
                className="my-4 w-full"
            >
                <textarea 
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-w-2"
                    placeholder="Conte com detalhes o que está acontecendo..."  
                    value={comment}
                    onChange={event => setComment(event.target.value)}  
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        screenshoot={screenshoot}
                        onScreenshootTook={setScreenshot}    
                    />
                    <button 
                        disabled={comment.length === 0}
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >   
                        Enviar Feedback
                    </button>
                </footer>
            </form>
        </>
    );
}