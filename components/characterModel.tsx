import { useGLTF } from "@react-three/drei";
import { CharacterModelProps } from "@/types";

export default function CharacterModel({ url, position = [0,0,0], rotation = [0, 0, 0], scale = [1, 1, 1] }: CharacterModelProps){
    const { scene } = useGLTF(url);

    return(
        <primitive object={scene} position={position} rotation={rotation} scale={scale}/>
    )
}