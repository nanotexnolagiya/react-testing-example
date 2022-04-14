import { useState, useCallback } from "react";

/**
 * CRUD hook
 * @returns {Object} data - hook returned data
 * @returns {Array} data.items - Items list
 * @returns {boolean} data.loading - Items requests status
 * @returns {string} data.error - Items requests error
 * @returns {Object} data.getItems - Get all items
 * @returns {Object} data.addItem - Add item
 * @returns {Object} data.updateItem - Update item
 * @returns {Object} data.deleteItem - Delete item
 * @example
 * const {
    items,
    loading,
    formLoading,
    error,
    getItems,
    addItem,
    updateItem,
    deleteItem,
  } = useCrud(service)
 */
export const useCrud = (service) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  const getItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await service.findAll();
      setItems(res || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const addItem = useCallback(async (payload) => {
    setFormLoading(true);
    try {
      const res = await service.create(payload);
      setItems((items) => [{...res, ...payload}, ...items]);
    } catch (error) {
      setError(error);
    } finally {
      setFormLoading(false);
    }
  }, [service]);

  const updateItem = useCallback(async (model, payload) => {
    setFormLoading(true);
    try {
      await service.update(model, payload);
      setItems((items) =>
        items.map((item) => (item.id === model ? payload : item))
      );
    } catch (error) {
      setError(error);
    } finally {
      setFormLoading(false);
    }
  }, [service]);

  const deleteItem = useCallback(async (model, payload) => {
    setLoading(true);
    try {
      await service.delete(model, payload);
      setItems((items) => items.filter((item) => item.id !== model));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [service]);

  return {
    items,
    loading,
    formLoading,
    error,
    getItems,
    addItem,
    updateItem,
    deleteItem,
  };
};
