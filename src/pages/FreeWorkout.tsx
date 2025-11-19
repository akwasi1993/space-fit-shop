const FreeWorkout = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Free 20-Minute Full Body Workout
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us for a guided workout perfect for beginners. All you need is basic home gym equipment and the motivation to get started!
            </p>
          </div>

          {/* Video Player */}
          <div className="relative w-full rounded-lg overflow-hidden shadow-elevated bg-card">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/jIpRlynVMBo"
                title="Free 20-Minute Full Body Workout"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 md:mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-secondary/30 rounded-lg">
              <h3 className="font-semibold mb-2">Duration</h3>
              <p className="text-muted-foreground">20 minutes</p>
            </div>
            <div className="text-center p-6 bg-secondary/30 rounded-lg">
              <h3 className="font-semibold mb-2">Level</h3>
              <p className="text-muted-foreground">Beginner friendly</p>
            </div>
            <div className="text-center p-6 bg-secondary/30 rounded-lg">
              <h3 className="font-semibold mb-2">Equipment</h3>
              <p className="text-muted-foreground">Basic home gym gear</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeWorkout;
