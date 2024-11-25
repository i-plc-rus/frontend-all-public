import {
  Chart as ChartJS,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';

export default defineNuxtPlugin(() => {
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ArcElement,
    CategoryScale,
    LinearScale
  );
});
