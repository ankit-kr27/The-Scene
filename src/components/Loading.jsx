const Loading = () => {
  return (
      <div className="flex h-screen items-center justify-center">
          <div
              className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
              role="status"
          >
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
  );
}

export default Loading
