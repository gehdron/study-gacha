import { useGLTF } from "@react-three/drei";
import { ModelProps } from "@/types";

export default function FurnitureModel({ url, position = [0,0,0], rotation = [0, 0, 0], scale = [1, 1, 1] }: ModelProps){
    const { scene } = useGLTF(url);

    return(
        <primitive object={scene} position={position} rotation={rotation} scale={scale}/>
    )
}