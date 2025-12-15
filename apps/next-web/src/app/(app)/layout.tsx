import { MainLayout } from "../components/MainLayout";

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="min-h-screen flex flex-col bg-[#fdfcf2]">

            <MainLayout>
                {children}
            </MainLayout>
        </div>
    );
}