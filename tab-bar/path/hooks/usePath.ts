import { useMemo } from 'react';
import { curveBasis, line } from 'd3-shape';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { parse } from 'react-native-redash';
import { Dimensions } from 'react-native';

type GenerateTabShapePath = (position: number, adjustedHeight: number, numTabs: number) => string;

const SCALE = 0.7;
const TAB_BAR_HEIGHT = 64;

const generateTabShapePath: GenerateTabShapePath = (position, adjustedHeight, numTabs) => {
  const { width } = Dimensions.get('screen');
  const adjustedWidth = width / numTabs;
  const tabX = adjustedWidth * position;

  const lineGenerator = line().curve(curveBasis);
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (65 + 35) * SCALE, 0],
    [tabX - (50 - 10) * SCALE, -6 * SCALE],
    [tabX - (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 10) * SCALE, -6 * SCALE],
    [tabX + (65 + 35) * SCALE, 0],
    [tabX + 100 * SCALE, 0],
  ]);

  return `${tab}`;
};

const usePath = ({ numTabs = 3 }: { numTabs: number }) => {
  const { width } = Dimensions.get('screen');
  const insets = useSafeAreaInsets();
  const tHeight = TAB_BAR_HEIGHT + insets.bottom;
  const adjustedHeight = tHeight - insets.bottom;

  const containerPath = useMemo(() => {
    return `M0,0L${width},0L${width},0L${width},${tHeight}L0,${tHeight}L0,0`;
  }, [tHeight]);

  const curvedPaths = useMemo(() => {
    return Array.from({ length: numTabs }, (_, index) => {
      const tabShapePath = generateTabShapePath(index + 0.5, adjustedHeight, numTabs);
      return parse(`${tabShapePath}`);
    });
  }, [adjustedHeight]);

  return { containerPath, curvedPaths, tHeight };
};

export default usePath;
