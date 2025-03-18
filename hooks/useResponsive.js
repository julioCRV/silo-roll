console.log("¡Hook useResponsive cargado!");

import { useState, useEffect, useMemo, useCallback } from "react";
import { PixelRatio, Platform, useWindowDimensions } from "react-native";
import { baseDevice, baseFontSize, breakpoints, maxFontScaleFactor } from "./constants";

/**
 * Hook personalizado para diseño responsivo en React Native.
 * Soporta detección de orientación, puntos de quiebre, escalado de fuentes e identificación de plataforma.
 */
console.log("Archivo useResponsive.js importado");
const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState(width > height ? "landscape" : "portrait");

  const themeScaler = (baseSize) => {
    const scaleFactor = Math.min(width / baseDevice.width, 1.5);
    return baseSize * scaleFactor;
  };

  // Nueva función para integrar con Theme
  const scaleThemeValue = (baseValue, type = 'width') => {
    const ratio = type === 'width' ? 0.3 : 0.2;
    return wp(baseValue * ratio);
  };

  useEffect(() => {
    setOrientation(width > height ? "landscape" : "portrait");
  }, [width, height]);

  const isLandscape = orientation === "landscape";
  const isPortrait = orientation === "portrait";

  /**
   * Obtiene el grupo de punto de quiebre actual basado en el ancho de la pantalla.
   * Usa useMemo para evitar recalculaciones innecesarias.
   */
  const breakpointGroup = useMemo(() => {
    for (let group in breakpoints) {
      console.log("entrando a breakpoints")
      if (width >= breakpoints[group][0] && width <= breakpoints[group][1]) {
        return group;
      }
    }
    return "default"; // Si no se encuentra coincidencia
  }, [width]);

  // Funciones utilitarias avanzadas con useCallback

  const vw = useCallback((widthPercent) => {
    const elementWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    return Math.floor((width / 100) * elementWidth);
  }, [width]);

  /**
   * Convierte el porcentaje de ancho a DP (píxeles independientes de densidad).
   */
  const wp = useCallback((widthPercent) => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    console.log("Calculando widthPercentageToDP con:", widthPercent);
    return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
  }, [width]);

  /**
   * Convierte el porcentaje de altura a DP.
   */
  const hp = useCallback((heightPercent) => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    console.log("definido heightPercentageToDP")
    return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
  }, [height]);
  
  /**
   * Determina si el dispositivo es una tablet.
   * Usa la relación de aspecto y el ancho mínimo.
   */
  const isTablet = useMemo(() => {
    const aspectRatio = width / height;
    console.log("definido funcion istable");
    return width >= 768 && aspectRatio > 1.3;
  }, [width, height]);

  // Lógica de escalado de fuentes
  const rem = useCallback((size = 0) => {
    const base = isTablet ? Math.min(width, height) : (isLandscape ? height : width);
    let multiplier = 1;
    if (Math.max(height, width) < baseDevice.height) {
      multiplier = 0.9;
    }
  
    const elementSize = typeof size === "number" ? size : parseFloat(size);
    console.log("definido rem")
    return Math.floor((base / baseDevice.width) * elementSize * multiplier);
  }, [width, height, isLandscape, isTablet]);

  const rf = useCallback((size = 0) => {
    const elementSize = typeof size === "number" ? size : parseFloat(size);
    console.log("definido funcion rf");
    return Math.min(baseFontSize * maxFontScaleFactor, elementSize);
  }, []);

  /**
   * Detecta si el dispositivo tiene una muesca (iPhone X y más nuevos).
   */
  const hasNotch = useMemo(() => {
    if (Platform.OS !== "ios") return false;
    const notchDevices = [812, 896, 844, 926, 932, 852, 1024];
    console.log("definido funcion hasnotch");
    return notchDevices.includes(height) || notchDevices.includes(width);
  }, [width, height]);

  return {
    isLandscape,
    isPortrait, 
    hp,
    vw,
    rem,
    rf,
    wp,
    hp,
    themeScaler,
    isIOS: Platform.OS === "ios",
    isAndroid: Platform.OS === "android",
    isTablet,
    hasNotch,
    breakpointGroup,
    scaleThemeValue,
  };
};

export default useResponsive;
