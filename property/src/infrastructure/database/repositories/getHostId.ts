export const getHostIdRepository = async (_id: string): Promise<string | null> => {
    try {
      const hostId = await fetchHostIdById(_id); 
      return hostId || null;
    } catch (error: any) {
      console.error("🚀 ~ getHostIdRepository ~ error:", error.message || error);
      throw new Error(error.message || 'An unexpected error occurred');
    }
  };
  
  const fetchHostIdById = async (_id: string): Promise<string | null> => {
    if (_id === 'valid_id') {
      return 'host_id_123';
    } else {
      return null;
    }
  };
  