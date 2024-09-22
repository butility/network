export const retryFailedRequests = async (
    url: string,
    retryDelay = 5,
    maxRetry = 3,
): Promise<void> => {
    let retryCount = 0;

    while (retryCount < maxRetry) {
        try {
            await fetch(url);
            console.log('Request successful');
            return;
        } catch (error) {
            retryCount++;
            console.warn(
                `Retrying request (${retryCount}/${maxRetry}) after ${retryDelay} seconds...`,
            );
            await delay(retryDelay * 1000); // Retry after delay
        }
    }

    console.error('Failed to complete request after retries');
};

const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));
