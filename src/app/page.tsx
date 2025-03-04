
"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sparkles, Float } from "@react-three/drei"
import { DiscIcon as DiscordLogo, Package, Download, Menu, X } from "lucide-react"

export default function AuroraFramework() {
    const [isMobile, setIsMobile] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: isMobile ? 60 : 45 }}>
                <color attach="background" args={["#000000"]} />
                <WireframeGlobe isMobile={isMobile} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
            </Canvas>

            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="absolute top-4 right-4 z-20 text-white bg-black/50 p-2 rounded-full backdrop-blur-sm"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}

            <div className="absolute top-1/4 md:top-1/3 left-0 right-0 text-center z-10 px-4">
                <div className="inline-block backdrop-blur-sm bg-black/30 px-4 sm:px-8 py-4 sm:py-6 rounded-xl">
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        The Aurora Framework
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        Built for Innovation.
                    </p>
                </div>
            </div>

            <div
                className={`${isMobile && !menuOpen ? "hidden" : "flex"} 
                      ${
                    isMobile
                        ? "absolute right-4 top-16 flex-col items-end gap-3 z-20"
                        : "absolute bottom-10 left-0 right-0 justify-center gap-6 z-10 flex-row"
                }`}
            >
                <NavButton icon={<DiscordLogo className="mr-2 h-4 w-4" />} label="Discord" />
                <NavButton icon={<Package className="mr-2 h-4 w-4" />} label="Modules" />
                <NavButton icon={<Download className="mr-2 h-4 w-4" />} label="Download" />
            </div>
        </div>
    )
}

function WireframeGlobe({ isMobile }: { isMobile: boolean }) {
    const globeRef = useRef(null)
    const gridRef = useRef(null)

    useFrame((state, delta) => {
        if (globeRef.current) {
            // @ts-expect-error because it won't be null
            globeRef.current.rotation.y += delta * 0.1
        }
        if (gridRef.current) {
            // @ts-expect-error because it won't be null 2
            gridRef.current.rotation.y -= delta * 0.05
            // @ts-expect-error because it won't be null 3
            gridRef.current.rotation.x += delta * 0.03
        }
    })

    // Adjust position and size based on device
    const position: [number, number, number] = isMobile ? [2, 0, -3] : [4, 1, -4]
    const scale = isMobile ? 0.8 : 1

    return (
        <group position={position} rotation={[0.5, 0.5, 0]} scale={scale}>
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
                <mesh ref={globeRef}>
                    <sphereGeometry args={[1.8, 32, 32]} />
                    <meshBasicMaterial color="white" wireframe={true} opacity={0.4} transparent={true} />
                </mesh>

                <mesh ref={gridRef}>
                    <sphereGeometry args={[2.3, 15, 15]} />
                    <meshBasicMaterial color="white" wireframe={true} opacity={0.2} transparent={true} />
                </mesh>
            </Float>

            <Sparkles
                count={isMobile ? 100 : 200}
                scale={isMobile ? 10 : 12}
                size={1}
                speed={0.2}
                opacity={0.5}
                color="white"
            />

            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
        </group>
    )
}

interface NavButtonProps {
    icon: React.ReactNode
    label: string
}

function NavButton({ icon, label }: NavButtonProps) {
    return (
        <button className="cursor-pointer bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all flex flex-row items-center px-4 py-2 rounded-lg backdrop-blur-sm">
            {icon}
            {label}
        </button>
    )
}

