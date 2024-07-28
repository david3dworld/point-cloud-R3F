import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Grid, OrbitControls, Stats } from "@react-three/drei";
import { PCDLoader } from "@loaders.gl/pcd";
import { RootState } from "../store/store";
import { randomSamplingTypedArray } from "../utils";
import useLoader from "../hooks/useLoader";

const POINT_BUDGET = 20_000;

function PCDPointCloud(props: { file: File | null }) {
  if (!props.file) {
    return null;
  }

  const { scene } = useThree();
  const [points, setPoints] = useState();

  const { data, err, isLoading } = useLoader(props.file, PCDLoader);

  useEffect(() => {
    THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      const geometry = new THREE.BufferGeometry();

      console.log("data", data);

      const vertexCount = data.header.vertexCount;
      const pointCount = Math.min(vertexCount, POINT_BUDGET);

      const positions = randomSamplingTypedArray(
        data.attributes.POSITION.value,
        pointCount,
        data.attributes.POSITION.size
      );

      // for (let i = 0; i < colors.length; i++) {
      //   colors[i] = colors[i] / 255;
      // }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      // geometry.setAttribute(
      //   "color",
      //   new THREE.Float32BufferAttribute(colors, 3)
      // );
      geometry.computeBoundingSphere();

      const material = new THREE.PointsMaterial({
        size: 0.04,
        color: "#FF00FF",
      });
      const points = new THREE.Points(geometry, material);

      setPoints(points);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (points) {
      scene.add(points);

      return () => {
        // Cleanup
        scene.remove(points);
        points.geometry.dispose();
        points.material.dispose();
      };
    }
  }, [points, scene]);

  return null;
}

export default function Scene() {
  const pointCloudFile = useSelector(
    (state: RootState) => state.scene.pointCloudFile
  );

  return (
    <Canvas
      camera={{
        position: [3, -5, 5],
        up: [0, 0, 1],
        near: 0.1,
        far: 1000,
      }}
    >
      <PCDPointCloud file={pointCloudFile} />

      {/* <axesHelper args={[5]} up={[0, 0, 1]} /> */}

      <Grid
        rotation={[Math.PI / 2, 0, 0]}
        cellSize={1}
        cellColor={"#6f6f6f"}
        sectionSize={4}
        sectionColor={"#4f4f4f"}
        fadeDistance={20}
        fadeStrength={1}
        infiniteGrid={true}
      />

      <OrbitControls enableRotate={true} enableDamping={true} up={[0, 0, 1]} />

      <Stats />
    </Canvas>
  );
}
//
