import { Ref, ref, UnwrapRef } from 'vue';

export const InputComposable = <T>(
  initialValue: T,
  emit: (event: 'update:modelValue', ...args: any[]) => void,
): {
  val: Ref<any, any> | Ref<T, T> | Ref<UnwrapRef<T>, T | UnwrapRef<T>>;
  update: () => void;
} => {
  const val = ref<T>(initialValue);

  const update = () => {
    emit('update:modelValue', val.value);
  };

  return { val, update };
};
