import { useGetCategoriesQuery } from '@/entities/category';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui';
import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';
import { COLORS } from '../lib/colors';

export const ExpenseDistribution = () => {
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  const chartData = useMemo(() => {
    return categoriesData.map(({ budget, name }, index) => ({ budget, name, fill: COLORS[index % COLORS.length] }));
  }, [categoriesData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent accessibilityLayer hideLabel />} />
            <Pie data={chartData} dataKey="budget" label />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Showing total expenses for categories</div>
      </CardFooter>
    </Card>
  );
};
