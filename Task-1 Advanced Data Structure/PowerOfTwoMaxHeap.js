import java.util.ArrayList;
import java.util.List;

public class PowerOfTwoMaxHeap<T extends Comparable<T>> {
    private final int numChildren;
    private final List<T> heap;

    public PowerOfTwoMaxHeap(int x) {
        this.numChildren = (int) Math.pow(2, x);
        this.heap = new ArrayList<>();
    }

    public void insert(T value) {
        heap.add(value);
        bubbleUp(heap.size() - 1);
    }

    public T popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        T max = heap.get(0);
        int lastIndex = heap.size() - 1;
        heap.set(0, heap.get(lastIndex));
        heap.remove(lastIndex);
        bubbleDown(0);

        return max;
    }

    private void bubbleUp(int childIndex) {
        int parentIndex = (childIndex - 1) / numChildren;
        while (childIndex > 0 && heap.get(childIndex).compareTo(heap.get(parentIndex)) > 0) {
            swap(childIndex, parentIndex);
            childIndex = parentIndex;
            parentIndex = (childIndex - 1) / numChildren;
        }
    }

    private void bubbleDown(int parentIndex) {
        int maxChildIndex = findMaxChildIndex(parentIndex);
        while (maxChildIndex != -1 && heap.get(parentIndex).compareTo(heap.get(maxChildIndex)) < 0) {
            swap(parentIndex, maxChildIndex);
            parentIndex = maxChildIndex;
            maxChildIndex = findMaxChildIndex(parentIndex);
        }
    }

    private int findMaxChildIndex(int parentIndex) {
        int startChildIndex = parentIndex * numChildren + 1;
        if (startChildIndex >= heap.size()) {
            return -1;
        }

        int maxChildIndex = startChildIndex;
        int endChildIndex = Math.min(startChildIndex + numChildren, heap.size());
        for (int i = startChildIndex + 1; i < endChildIndex; i++) {
            if (heap.get(i).compareTo(heap.get(maxChildIndex)) > 0) {
                maxChildIndex = i;
            }
        }

        return maxChildIndex;
    }

    private void swap(int index1, int index2) {
        T temp = heap.get(index1);
        heap.set(index1, heap.get(index2));
        heap.set(index2, temp);
    }

    public static void main(String[] args) {
        PowerOfTwoMaxHeap<Integer> heap = new PowerOfTwoMaxHeap<>(2);
        heap.insert(5);
        heap.insert(10);
        heap.insert(20);
        heap.insert(15);
        heap.insert(35);
        heap.insert(7);

        System.out.println(heap.popMax());  // Output: 35
        System.out.println(heap.popMax());  // Output: 20
        System.out.println(heap.popMax());  // Output: 15
        System.out.println(heap.popMax());  // Output: 10
        System.out.println(heap.popMax());  // Output: 7
        System.out.println(heap.popMax());  // Output: 5
    }
}
