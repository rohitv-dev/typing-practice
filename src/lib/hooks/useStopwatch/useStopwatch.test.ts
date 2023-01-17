import { afterAll, beforeAll, beforeEach, describe, expect, it, SpyInstance, vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import useStopwatch from "./useStopwatch";

describe("useStopwatch", () => {
  let setIntervalSpy: SpyInstance;
  let clearIntervalSpy: SpyInstance;

  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    setIntervalSpy = vi.spyOn(global, "setInterval");
    clearIntervalSpy = vi.spyOn(global, "clearInterval");
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("initializes correctly", () => {
    const { result } = renderHook(() => useStopwatch());

    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(setIntervalSpy).not.toHaveBeenCalled();
    expect(clearIntervalSpy).not.toHaveBeenCalled();
  });

  it("elapsed time increments correctly after start", () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    vi.advanceTimersByTime(5000);

    expect(setIntervalSpy).toHaveBeenCalledOnce();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(0);
    expect(result.current.elapsedTime).toBe(5);
  });

  it("elapsed time doesn't increment after stop", () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    vi.advanceTimersByTime(5000);

    act(() => {
      result.current.stop();
    });

    vi.advanceTimersByTime(5000);

    expect(setIntervalSpy).toHaveBeenCalledOnce();
    expect(clearIntervalSpy).toHaveBeenCalledOnce();
    expect(result.current.elapsedTime).toBe(5);
  });

  it("reset after start resets values", () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    vi.advanceTimersByTime(5000);

    act(() => {
      result.current.reset();
    });

    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(setIntervalSpy).toHaveBeenCalledOnce();
    expect(clearIntervalSpy).toHaveBeenCalledOnce();
  });
});
