import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormProps } from 'react-hook-form';
import type { z } from 'zod';

export function useZodForm<S extends z.ZodTypeAny, TContext = any>(
  schema: S,
  props: UseFormProps<z.infer<S>, TContext>,
) {
  return useForm<z.infer<S>>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    ...props,
  });
}
