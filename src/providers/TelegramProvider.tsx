import { 
    bindViewportCSSVars, 
    initMiniApp, 
    initSwipeBehavior, 
    useViewport 
} from "@telegram-apps/sdk-react";
import { ReactNode, useEffect } from "react";

export default function TelegramProvider({ children }: { children: ReactNode }) {
    const viewport = useViewport()
    const [swipeBehavior] = initSwipeBehavior()
    const [miniApp] = initMiniApp();

    // rebinding vewport vars on window resize
    useEffect(() => {
        if (viewport) {
          return bindViewportCSSVars(viewport);
        }
    }, [viewport]);

    // disabling swipe-to-close feature if app content is scrollable
    useEffect(() => {
        const appContent = document.querySelector('.app__content');

        if (!appContent || !(appContent instanceof HTMLElement)) return;

        const isScrollable = () => {
            return appContent.scrollHeight > appContent.clientHeight;
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (appContent.contains(e.target as Node) && isScrollable()) {
                swipeBehavior.disableVerticalSwipe();
            } else {
                swipeBehavior.enableVerticalSwipe();
            }
        };

        const handleTouchEnd = () => {
            swipeBehavior.enableVerticalSwipe();
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [swipeBehavior]);

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