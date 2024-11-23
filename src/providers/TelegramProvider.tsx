import {
    initMiniApp, 
    initSwipeBehavior,
    useViewport
} from "@telegram-apps/sdk-react";
import { ReactNode, useEffect } from "react";

export default function TelegramProvider({ children }: { children: ReactNode }) {
    const [miniApp] = initMiniApp();
    const [swipeBehavior] = initSwipeBehavior();
    const viewport = useViewport()

    // drag to close feature disabled
    useEffect(() => {
        if (viewport) {
            viewport.expand();
        }
        swipeBehavior.disableVerticalSwipe();
    }, []);
    
    // setting mini app colors to default page colors
    useEffect(() => {
        miniApp.setHeaderColor('#000000')
        miniApp.setBgColor('#000000')
    }, [])

    return (
        <>
            {children}
        </>
    ) 
}